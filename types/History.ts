export interface HistoryItem {
    time: string
    staffName: string
    total: string
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