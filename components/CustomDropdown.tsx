import { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownItem } from "../types/DropdownItem";

interface CustomDropdownProps {
    data: DropdownItem[];
    setSelectItem: (i: any) => void;
    selectItem: DropdownItem | null;
    placeholder: string;
    disable?: boolean
    searchable?: boolean
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
    data,
    setSelectItem,
    selectItem,
    placeholder,
    disable,
    searchable
}) => {
    const [value, setValue] = useState<string | null>(selectItem ? selectItem.value : null);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
        <Dropdown
            style={[
                styles.dropdown,
                disable && {
                    opacity: 0.4
                },
                isFocus && {
                    borderColor: 'rgb(14 165 233)', borderWidth: 2
                }
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            activeColor='rgb(241 245 249)'
            data={data}
            search={searchable ?? true}
            maxHeight={300}
            disable={disable ? disable : false}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? placeholder : 'Trống'}
            searchPlaceholder="Tìm kiếm..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: DropdownItem) => {
                setValue(item.value);
                setIsFocus(false);
                setSelectItem(item);
            }}
        />
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: Platform.OS === 'android' ? 10 : 50 
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})