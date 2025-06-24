OBJS_METIER = src/data/rome_metiers/**/* 
OBJS_COMP = src/data/rome_competences/**/*
NAME= offres_emploi
ORIGIN =  $(shell git branch --show-current)
COM=default_push

git: clean

	git add . 
	git commit -m $(COM) 
	git push origin $(ORIGIN)

clean:
	rm -rf data/*
r: 
	npm run dev

