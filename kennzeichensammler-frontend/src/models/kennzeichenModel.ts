
export interface Kennzeichen {
    kuerzel: string
}

export interface GefundenesKennzeichen extends Kennzeichen {
    zeitpunktDesFindens: Date
}
