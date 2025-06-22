OBJS_METIER = src/data/rome_metiers/**/* 
OBJS_COMP = src/data/rome_competences/**/*

ORIGIN =  $(shell git branch --show-current)
COM=default_push

git: clean

	git add . 
	git commit -m $(COM) 
	git push origin $(ORIGIN)

clean:
	rm -rf src/data/rome_competences/competences && mkdir src/data/rome_competences/competences
	rm -rf src/data/rome_competences/competences_detaillee && mkdir src/data/rome_competences/competences_detaillee
	rm -f ${OBJS_COMP}
	rm -f ${OBJS_METIER}

r: clean
	npm run dev