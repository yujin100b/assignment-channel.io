import { isArray } from "lodash"

export function sortlist(list, type, key) {
    switch (type) {
        case 'up':
            return list.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
        case 'down':
            return list.sort((a, b) => (b[key] > a[key]) ? 1 : -1)
        default:
            return list
    }
}

const includeObject = (row, query) => {
    const values = Object.values(row)
    let match = false
    for(var i=0; i < values.length ; i++){
        if (values[i].length === 0) continue 

        const value = isArray(values[i]) ? values[i][0] : values[i].toLowerCase() 

        if (value.indexOf(query) === -1) continue
        else {
            match = true
            break
        }
    }
    return match
}

export function searchlist(list, input) {
    const query = input.toLowerCase()
    return list.filter(row => includeObject(row, query)
    );
}