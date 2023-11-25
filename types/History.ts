export interface HistoryItem {
    id: string
    time: string
    staffName: string
    total: string;
    totalWithoutVat: string
    vat: string
    prescriptionId: string
    historyDetail: HistoryDetail[]
}

export interface HistoryExpandable {
    isExpanded: boolean
    title: string
    histories: HistoryItem[]
}

export interface History {
    title: string
    histories: HistoryItem[]
}

export interface HistoryDetail {
    drugName: string
    quantity: string
    unitPrice: string
}