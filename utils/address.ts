import provinces from '../node_modules/hanhchinhvn/dist/tinh_tp.json'
import districts from '../node_modules/hanhchinhvn/dist/quan_huyen.json'
import wards from '../node_modules/hanhchinhvn/dist/xa_phuong.json'

import { DropdownItem } from '../types/DropdownItem';

const allProvince = () => {
    let array: DropdownItem[] = [];
    for (let key in provinces) {
        array.push({
            value: provinces[key].code,
            label: provinces[key].name_with_type,
        })
    }
    return array
}

const getDistrictsByProvinceCode = (provinceCode: string) => {
    let array: DropdownItem[] = [];
    for (let key in districts) {
        if (districts[key].parent_code === provinceCode)
        array.push({
            value: districts[key].code,
            label: districts[key].name_with_type,
        })
    }
    return array
}

const getWardsByDistrictCode = (districtCode: string) => {
    let array: DropdownItem[] = [];
    for (let key in wards) {
        if (wards[key].parent_code === districtCode)
        array.push({
            value: wards[key].code,
            label: wards[key].name_with_type,
        })
    }
    return array
}

const handleAddress = (address: string): string => {
    const splitAddress: string[] = address.split('/')
    return splitAddress.filter((data) => data.length > 0).join(', ');
}

export {
    allProvince,
    getDistrictsByProvinceCode,
    getWardsByDistrictCode,
    handleAddress
}