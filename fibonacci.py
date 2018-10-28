def fibonacii(n):
	a=0
	b=1
	print a
	print b
	i=3
	while i<=n:
		c=a+b
		print c
		a=b
		b=c
		i=i+1

fibonacii(10)
