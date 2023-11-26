import { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownItem } from "../types/DropdownItem";

interface CustomDropdownProps {
    data: DropdownItem[];
    setSelectItem: (i: DropdownItem | null) => void;
    selectItem: DropdownItem | null;
    placeholder: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
    data,
    setSelectItem,
    selectItem,
    placeholder
}) => {
    const [value, setValue] = useState<string | null>(selectItem ? selectItem.value : null);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'rgb(14 165 233)', borderWidth: 2 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            activeColor='rgb(241 245 249)'
            data={data}
            search
            maxHeight={300}
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
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 16,
        paddingHorizontal: 12,
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
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})