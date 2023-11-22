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
