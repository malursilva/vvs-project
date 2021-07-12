export class ATM {
    private readonly bills: number[]
    private readonly billAmmounts: number[]

    constructor (bills: number[], billAmmounts: number[]) {
        this.bills = bills.sort((a, b) => b - a)
        this.billAmmounts = billAmmounts
    }

    public getConfigurations (ammount: number): Configuration {
        const billsCopy = [...this.bills]
        const billAmmountsCopy = [...this.billAmmounts]
        const initialVariation = new Array(this.bills.length).fill(0)
        const allSolutions = ATM.solutions(billsCopy, billAmmountsCopy, initialVariation, ammount, 0)
        const configurations: Configuration = {
            moreHigherBills: allSolutions[0],
            moreLowerBills: allSolutions[allSolutions.length - 1]
        }

        return configurations
    }


    public static solutions (bills: number[], ammounts: number[], variation: number[], ammount: number, position: number): number[][] {
        const list: number[][] = []
        const value: number = ATM.compute(bills, variation)
        
        if (value < ammount) {
            for (let i = position; i < bills.length; i++) {
                if (ammounts[i] > variation[i]) {
                    const newVariation: number[] = [...variation]
                    newVariation[i]++
                    const newList = ATM.solutions(bills, ammounts, newVariation, ammount, i)
                    if (newList != null) {
                        list.push(...newList)
                    }
                }
            }
        } else if (value === ammount) {
            list.push(ATM.myCopy(variation))
        }

        return list
    }

    public static compute (bills: number[], variation: number[]): number {
        var ret = 0

        for (let i = 0; i < variation.length; i++) {
            ret += bills[i] * variation[i]
        }

        return ret
    }

    public static myCopy (array: number[]): number[] {
        var ret: number[] = new Array(array.length)

        for (let i = 0; i < array.length; i++) {
            ret[i] = array[i]
        }

        return ret
    }
}

export interface Configuration {
    moreHigherBills: number[]
    moreLowerBills: number[]
}