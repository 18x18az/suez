import { IMatchInfo, MATCH_TYPE } from "@18x18az/rosetta";

export function makeMatchName(match: IMatchInfo): string {
    const matchType = match.type;
    let matchTypeText = ""
    if (matchType === MATCH_TYPE.QUAL) {
        matchTypeText = "Qualification"
    } else if (matchType === MATCH_TYPE.R16) {
        matchTypeText = "Round of 16"
    } else if (matchType === MATCH_TYPE.QF) {
        matchTypeText = "Quarterfinals"
    } else if (matchType === MATCH_TYPE.SF) {
        matchTypeText = "Semifinals"
    } else if (matchType === MATCH_TYPE.F) {
        matchTypeText = "Finals"
    }

    const matchNumber = match.number;

    let subNumber = ""
    if (match.subNumber && match.subNumber > 1) {
        subNumber = `-${match.subNumber}`
    }

    return `${matchTypeText} Match ${matchNumber}${subNumber}`
}

export function makeShortMatchName(match: IMatchInfo): string {
    const matchType = match.type;
    let matchTypeText = ""
    if (matchType === MATCH_TYPE.QUAL) {
        matchTypeText = "Q"
    } else if (matchType === MATCH_TYPE.R16) {
        matchTypeText = "R16"
    } else if (matchType === MATCH_TYPE.QF) {
        matchTypeText = "QF"
    } else if (matchType === MATCH_TYPE.SF) {
        matchTypeText = "SF"
    } else if (matchType === MATCH_TYPE.F) {
        matchTypeText = "F"
    }

    const matchNumber = match.number;

    let subNumber = ""
    if (match.subNumber && match.subNumber > 1) {
        subNumber = `-${match.subNumber}`
    }

    return `${matchTypeText} ${matchNumber}${subNumber}`
}