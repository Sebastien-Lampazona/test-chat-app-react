// Actions Types
export const SAVE_PSEUDO = 'SAVE_PSEUDO';

// Action creators
export const savePseudo = (pseudo) => {
    return {
        type: SAVE_PSEUDO,
        pseudo,
    }
}