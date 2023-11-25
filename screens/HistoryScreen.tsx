import { ActivityIndicator, LayoutAnimation, Platform, ScrollView, Text, UIManager, View } from "react-native";
import { Expandable } from "../components/Expandable";
import { useEffect, useState } from "react";
import { HistoryExpandable, HistoryItem } from "../types/History";
import { useGetHistory } from "../hooks/historyHook";

export function HistoryScreen() {
    const { data } = useGetHistory()
    const [historiesExpand, setHistoryExpand] = useState<HistoryExpandable[]>([])

    const updateLayout = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setHistoryExpand(historiesExpand.map((history, i) => {
            return index === i ? {...history, isExpanded: !history.isExpanded} : history
        }))
    }

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    useEffect(() => {
        if (data) {
            setHistoryExpand(data)    
        }
    }, [data])

    return (
        <ScrollView >
            {
                !data
                ?
                    <ActivityIndicator size="large" />
                :
                historiesExpand.map((historyExpand, index) => (
                    <Expandable 
                        onClick={
                            () => {
                                updateLayout(index)
                            }
                        }
                        data={ historyExpand }
                    />
                ))
            }
        </ScrollView>
    )
}