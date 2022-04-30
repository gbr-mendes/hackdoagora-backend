function orderDumpsByRegion(queryset){
    const orderedQueryset = {norte:[],sul:[], leste:[], oeste:[], centro:[]}
    queryset.map(dump=> {
        switch(dump.region){
            case "Norte":
                orderedQueryset.norte.push(dump)
                break
            case "Sul":
                orderedQueryset.sul.push(dump)
                break
            case "Leste":
                orderedQueryset.leste.push(dump)
                break
            case "Oeste":
                orderedQueryset.oeste.push(dump)
                break
            case "Centro":
                orderedQueryset.centro.push(dump)
                break
        }
    })
    return orderedQueryset
}

module.exports = {orderDumpsByRegion}