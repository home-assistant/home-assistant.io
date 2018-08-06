var fs = require('fs')
  , async = require('async')
  , GitHubApi = require('github')
  , mu = require('mu2')
  , moment = require('moment-timezone');

if(!process.env.GITHUB_TOKEN) {
  console.error('You must set the GITHUB_TOKEN environment variable to a GitHub personal access token.');
  return;
}

var organizationName = process.env.GITHUB_ORGANIZATION_NAME || 'home-assistant';

mu.root = __dirname;

var github = new GitHubApi({
  headers: { 'user-agent': 'Home Assistant Contributors List Updater <hello@home-assistant.io>' }
});

github.authenticate({ type: 'oauth', token: process.env.GITHUB_TOKEN });

var usersMap = {};

github.repos.getForOrg({
  org: organizationName,
  type: 'public',
  per_page: 100
}, function(err, repos){
  var headerSource = (err && err.headers) ? err.headers : repos.meta;
  var ratelimitLimit = Number(headerSource['x-ratelimit-limit']);
  var ratelimitRemaining = Number(headerSource['x-ratelimit-remaining']);
  console.log('Rate limits: '+ratelimitRemaining+'/'+ratelimitLimit, '(remaining/limit)');
  if(err) {
    if(err.code == 403 && ratelimitRemaining == 0) {
      var resetUnixTime = moment.unix(err.headers['x-ratelimit-reset']);
      var resetTimeFormatted = resetUnixTime.format();
      var resetAt = moment().to(resetUnixTime);
      console.error('Error when getting list of repos in org, because rate limits are exhausted. Rate limits reset', resetAt, 'from now ('+resetTimeFormatted+')');
    } else {
      console.error('Error when attempting to get a list of all repos in org...', err.message);
    }
    return;
  }
  async.each(repos, function(repo, cb){
    github.repos.getContributors({ owner: organizationName, repo: repo.name, per_page: 100 }, function(err, contributors){
      getContributors(err, contributors, repo, cb);
    });
  }, function(err){
    if(err){
      console.error('Error when iterating organization repos', err);
      return;
    }
    console.log('Done getting contributors for '+repos.length+' found organization repos...');
    async.each(Object.keys(usersMap), function(login, cb){
      github.users.getForUser({username: login}, function(err, userInfo){
        if(err){
          console.error('Got error when get user details for', login, err);
          cb(err);
          return;
        }
	if (userInfo.name) {
	  userInfo.name = userInfo.name.replace(/^@/, '')
	  .replace(/</g, '&lt;')
	  .replace(/>/g, '&gt;')
	  .replace(/[\\`*_{}[\]()#+-.!~|]/g, '\\$&');
	}
        usersMap[login].info.name = userInfo.name || userInfo.login;
        usersMap[login].info.username = userInfo.login;
        cb();
      });
    }, function(err){
      if(err){
        console.error('Got error when running', err);
        return;
      } else {
        console.log('Building contributors!!!');
        buildContributors();
      }
    });
  });
});

function getContributors(err, res, repo, callback){
  if(err) {
    console.error('Error when getting contributors', err);
    callback(err);
    return
  } else {
    console.log('Processing the '+res.length+' contributors to '+repo.name);
    async.each(res, function(contributor, cb){
      if(!usersMap[contributor.login]) {
        usersMap[contributor.login] = {
          counts: {},
          info: {login: contributor.login, id: contributor.id}
        };
      }
      usersMap[contributor.login].counts[repo.name] = contributor.contributions;
      cb(null);
    }, function(){
      if (github.hasNextPage(res)) {
        github.getNextPage(res, function(newErr, newContributors){
          getContributors(newErr, newContributors, repo, callback);
        });
      } else {
        callback(null);
      }
    });
  }
}

function buildContributors(){
  var fearlessLeader = usersMap['balloob'];
  fearlessLeader.countString = buildCountString(fearlessLeader.counts);
  delete usersMap['balloob'];
  var users = Object.keys(usersMap).map(function (key) {
    var obj = usersMap[key];
    obj.countString = buildCountString(obj.counts);
    return obj;
  }).sort(function(a, b){
    var nameA = a.info.name.toLowerCase();
    var nameB = b.info.name.toLowerCase();
    if (nameA < nameB) { return -1; }
    if (nameA > nameB) { return 1; }
    return 0;
  });
  var headerDate = moment().tz('UTC').format('YYYY-MM-DD HH:mm:ss ZZ');
  var footerDate = moment().tz('UTC').format('dddd, MMMM Do YYYY, h:mm:ss a zz');
  var output = '';
  mu.compileAndRender('credits.mustache', {
    allUsers: users,
    fearlessLeader: fearlessLeader,
    headerDate: headerDate,
    footerDate: footerDate
  }).on('data', function (data) {
    output += data.toString();
  }).on('end', function(){
    fs.writeFile('../source/developers/credits.markdown', output, function (writeErr) {
      if (writeErr) {
        console.log('Error when writing credits.markdown', writeErr);
      } else {
        console.log('Done getting user info, wrote credits.markdown file!');
      }
    });
  });
}

function buildCountString(counts){
  var totalCommits = 0;
  var countStrings = [];
  Object.keys(counts).sort(function(a, b){
    return counts[b] - counts[a];
  }).forEach(function (countKey) {
    var count = counts[countKey];
    var word = (count > 1) ? 'commits' : 'commit';
    totalCommits = totalCommits+count;
    countStrings.push(count+' '+word+' to '+countKey);
  });
  countStrings.unshift(totalCommits+' total commits to the home-assistant organization');
  return countStrings.join(', ');
}
