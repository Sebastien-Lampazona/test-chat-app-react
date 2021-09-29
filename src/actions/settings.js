export const SAVE_PSEUDO = 'SAVE_PSEUDO';

export const savePseudo = (pseudo) => {
    return {
        type: SAVE_PSEUDO,
        pseudo,
    }
}