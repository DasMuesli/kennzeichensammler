## Benutzung
```bash
git clone git@github.com:DasMuesli/kennzeichensammler.git
docker-compose up --build frontend
```
##  Datenbankschema
```sql
CREATE TABLE benutzer (
	benutzername varchar NOT NULL,
	passwort varchar NOT NULL,
	CONSTRAINT benutzer_pk PRIMARY KEY (benutzername)
);

CREATE TABLE kennzeichen (
	kuerzel varchar NOT NULL,
	CONSTRAINT kennzeichen_pk PRIMARY KEY (kuerzel)
);

CREATE TABLE gefundenekennzeichen (
	kennzeichen varchar NULL,
	benutzer varchar NULL,
	zeitpunktdesfindens date NOT NULL,
	CONSTRAINT gefundenekennzeichen_benutzer_fk FOREIGN KEY (benutzer) REFERENCES benutzer(benutzername),
	CONSTRAINT gefundenekennzeichen_kennzeichen_fk FOREIGN KEY (kennzeichen) REFERENCES kennzeichen(kuerzel)
);
``` 
