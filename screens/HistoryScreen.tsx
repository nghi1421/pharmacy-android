import { LayoutAnimation, Platform, ScrollView, Text, UIManager, View } from "react-native";
import { Expandable } from "../components/Expandable";
import { useEffect, useState } from "react";
import { HistoryExpandable, HistoryItem } from "../types/History";
import { getCustomer } from "../utils/helper";

export function HistoryScreen() {
    const [historiesExpand, setHistoryExpand] = useState<HistoryExpandable[]>([{
        isExpanded: true,
        title: '09/2023',
        histories: [{
            staffName: 'Nguyễn Thanh Nghị',
            total: '220,000 VND',
            time: '22/11/2023'
        }]
        },
        {
            isExpanded: true,
            title: '10/2023',
            histories: [{
                staffName: 'Nguyễn Thanh Nghị',
                total: '220,000 VND',
                time: '22/11/2023'
            }]
        },
        {
            isExpanded: true,
            title: '11/2023',
            histories: [{
                staffName: 'Nguyễn Thanh Nghị',
                total: '220,000 VND',
                time: '19/11/2023'
            },
            {
                staffName: 'Nguyễn Thanh Nghị',
                total: '320,000 VND',
                time: '20/11/2023'
            },
            {
                staffName: 'Nguyễn Thanh Nghị',
                total: '542,000 VND',
                time: '22/11/2023'
            },
            {
                staffName: 'Nguyễn Thanh Nghị',
                total: '542,000 VND',
                time: '22/11/2023'
            }
            ]
        }]
    )

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
        let phoneNumber = ''
        getCustomer().then(customer => {
            phoneNumber = customer.phoneNumber
        })
        console.log('Phone number', phoneNumber)
    }, [])

    return (
        <ScrollView>
            {
                historiesExpand.map((historyExpand, index) => (
                    <Expandable
                    onClick={
                        () => {
                            updateLayout(index)
                        }
                    }
                    data={ historyExpand }
                ></Expandable>
                ))
            }
        </ScrollView>
    )
}