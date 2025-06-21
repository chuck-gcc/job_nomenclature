OBJS_JSON = src/data/**/**/*

COM=default_push

git: clean

	git add . 
	git commit -m $(COM) 
	git push origin main

clean:
	rm -f ${OBJS_JSON}

r: clean
	npm run dev