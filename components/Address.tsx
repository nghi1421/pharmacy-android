import Animated, { FadeInDown } from "react-native-reanimated"
import { CustomDropdown } from "./CustomDropdown"
import { useEffect, useState } from "react"
import { DropdownItem } from "../types/DropdownItem"
import { allProvince, getDistrictsByProvinceCode, getWardsByDistrictCode } from "../utils/address"
import { TextInput } from "react-native"

interface AddressProp {
    initAddress?: string,
    setAddress: (address: string) => void;
}

export const Address: React.FC<AddressProp> = ({ initAddress, setAddress}) => {
    const [province, setProvince] = useState<DropdownItem | null>(null)
    const [district, setDistrict] = useState<DropdownItem | null>(null)
    const [ward, setWard] = useState<DropdownItem | null>(null)
    const [provinces, _] = useState<DropdownItem[]>(allProvince())
    const [districts, setDistricts] = useState<DropdownItem[]>([])
    const [wards, setWards] = useState<DropdownItem[]>([])
    const [detailAddress, setDetailAddress] = useState<string>('')
    const [oldAdress, setOldAddress] = useState<string>('')
    function getFullAddress(): string {
        return `${detailAddress}/${ward ? ward.label : ''}/${district ? district.label : ''}/${province ? province.label : ''}`
    }

    useEffect(() => {
        if (initAddress && initAddress !== oldAdress) {
            const splitAddress = initAddress.split('/') 
            try {
                // _(allProvince())
                if (splitAddress[0].length > 0) {
                    setDetailAddress(splitAddress[0])
                }
                let localDistricts: DropdownItem[] = []
                let localWards: DropdownItem[] = []
                if (splitAddress[3].length > 0) {
                    const provinceObj: DropdownItem | undefined = provinces
                        .find((province) => province.label === splitAddress[3])
                    if (provinceObj) {
                        localDistricts = getDistrictsByProvinceCode(provinceObj.value)
                        setDistricts(localDistricts)
                        setProvince({ label: provinceObj.label, value: provinceObj.value })
                    }
                }

                if (splitAddress[2].length > 0) {
                    const districtObj: DropdownItem | undefined = localDistricts.find((district) => district.label === splitAddress[2])
                    if (districtObj) {
                        localWards = getWardsByDistrictCode(districtObj.value)
                        setWards(localWards)
                        setDistrict({label: districtObj.label, value: districtObj.value})
                    }
                }

                if (splitAddress[1].length > 0) {
                    const wardObj: DropdownItem | undefined = localWards.find((ward) => ward.label === splitAddress[1])
                    if (wardObj) {
                        setWard({label: wardObj.label, value: wardObj.value})
                    }
                }
            }
            catch (error) {
            }

            setOldAddress(initAddress)
        }
        
        if (initAddress?.length === 0) {
            setProvince(null)
            setDetailAddress('')
        }
    }, [initAddress, oldAdress])
    
    useEffect(() => {
        if (province) {
            if (!initAddress || (initAddress && province.label !== initAddress.split('/')[3])) {
                //@ts-ignore
                const data = getDistrictsByProvinceCode(province.value)
                setDistricts(data)
                setDistrict(null)
                setWard(null)
            }
        }
        else {
            if (!initAddress) {
                setDistrict(null)
                setWard(null)
            }
        }
    }, [province])

    useEffect(() => {
        if (district) {
            if (!initAddress || (initAddress && district.label !== initAddress.split('/')[2])) {
                const data = getWardsByDistrictCode(district.value)
                setWards(data)
                setWard(null)
            }
        }
        else {
            if (!initAddress) {
                 setWards([])
                setWard(null)
            }
        }
    }, [district])

    useEffect(() => {
        setAddress(getFullAddress())
    })
    
    return (
        <>
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="py-2 rounded-2xl w-full"
            >
                <CustomDropdown
                    data={provinces}
                    placeholder='Chọn tỉnh thành'
                    setSelectItem={setProvince}
                    selectItem={province}
                />
            </Animated.View>

            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="py-2 rounded-2xl w-full"
            >
                <CustomDropdown
                    data={districts}
                    placeholder='Chọn quận huyện'
                    setSelectItem={setDistrict}
                    selectItem={district}
                    disable={province ? false : true}
                />
                </Animated.View>
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="py-2 rounded-2xl w-full"
            >
                <CustomDropdown
                    data={wards}
                    placeholder='Chọn xã/phường/thị trấn'
                    setSelectItem={setWard}
                    selectItem={ward}
                    disable={district ? false : true}
                />
            </Animated.View>    
                
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="py-2 rounded-2xl w-full"
            >
                <TextInput
                    className='bg-black/5 p-5 rounded-2xl text-lg'
                    placeholder='Số nhà, đường'
                    placeholderTextColor={'gray'}
                    value={detailAddress}
                    onChangeText={setDetailAddress}
                />
            </Animated.View>
        </>
    )
}