import { AntDesign } from "@expo/vector-icons";
import { createRef, useRef, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

interface DropdownItem {
    label: string
    value: string
}

interface ComboboxProps {
    list: DropdownItem[]
    disable?: boolean
    placeholder: string
}

export const Combobox: React.FC<ComboboxProps> = ({ list, placeholder, disable }) => {
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState<DropdownItem[]>(list);
    const [selectItem, setSelectItem] = useState<DropdownItem|null>();
    const searchRef = createRef<TextInput>();
    const onSearch = (search: string) => {
        if (search !== '') {
        let tempData = data.filter(item => {
            return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
            setData(tempData);
        } else {
            setData(list);
        }
    };
    return (
    <View className='flex'>
      <TouchableOpacity
        disabled={disable ? disable : false}
        className='w-full bg-slate-200 rounded-xl py-2 px-3'
        style={{
          height: 50,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight:'600'}}>
          {selectItem ? selectItem.label : placeholder}
        </Text>
        {clicked ? (
          <AntDesign name="up" size={24} color="black" />
        ) : (
          <AntDesign name="down" size={24} color="black" />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
            className='w-full'
            style={{
                elevation: 5,
                marginTop: 10,
                height: 300,
                alignSelf: 'center',
                backgroundColor: '#fff',
                borderRadius: 10,
            }}>
          <TextInput
            placeholder="Tìm kiếm"
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            className='px-3 py-2'
          />

          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setSelectItem(item);
                    setClicked(!clicked);
                    onSearch('');
                    setSearch('');
                  }}>
                  <Text style={{fontWeight: '500'}}>{item.label}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        ) : null}
    </View>
    )
}