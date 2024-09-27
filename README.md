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
## Bei Problemen
In der compose.yaml kann in DB-Service der Port mit `ports` statt `expose` nach außen hin freigegeben werden.  
Dann kann mit einem beliebigen SQL-Tool die Datenbank bearbeitet werden.

## Kennzeichen einfügen
In der Datei `kennzeichen.sql`  ist eine Auswahl von Kennzeichen als SQL-Insert Statements.
