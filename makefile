OBJS_JSON = src/data/**/*

COM=

git:
	git add . 
	git commit -m $(COM) 
	git push origin main

clean:
	rm ${OBJS_JSON}