import { Image, Text, View } from "react-native"
import { CountUp } from "use-count-up"
import { ImageSlider } from "react-native-image-slider-banner";
import { useContext, useEffect, useState } from "react";
import axiosClient from "../utils/axios";
import { STATISTIC_CUSTOMER } from "../utils/constants";
import { AuthContext } from "../App";

export const HomePage = () => {
    const { customer } = useContext(AuthContext)
    const [count, setCount] = useState<number>(0)
    const [bought, setBought] = useState<number>(0)

    useEffect(() => {
        const abortController = new AbortController();

        const fetchMessges = async () => {
            try {
                const response = await axiosClient.get(`${STATISTIC_CUSTOMER}${customer?.id}`);
                if (response.status === 200) {
                    setCount(response.data.count)
                    setBought(response.data.buy)
                    return;
                } else {
                    throw new Error("Failed to fetch");
                }
            } catch (error) {

            }
        };
        fetchMessges();

        return () => abortController.abort();
    }, []);
    return (
        <>
            <View className='bg-sky-600 h-60'>
                <View className='flex-row mx-6  my-4 rounded-lg  shadow-black'>
                    <View className='flex-col py-4 px-3 m-auto'>
                        <Text
                            style={{ fontSize: 60, }}
                            className='text-4xl uppercase font-bold text-white pt-6'
                        >
                            ON
                        </Text>
                        <Text className='text-2xl -mt-4 uppercase font-bold text-amber-600 '>Pharmacy</Text>
                        <Text className='text-md italic mt-4 text-slate-100 '>Sức khỏe con người là tất cả</Text>
                    </View>
                    <View className=" pl-4 flex-1">
                        <Image className="m-auto w-40 h-40" source={require('../assets/images/medicalkit.png')} />
                    </View>
                </View>
                <View className='flex-col py-4 px-3 bg-white mx-8 rounded shadow-sm shadow-black'>
                    <Text className='text-xl text-slate-500'>Chào mừng đến với ON Pharmacy</Text>
                </View>
            </View>

            <View className='bg-slate-50 flex-row gap-6 px-8 mt-4'>
                <View className='h-32 flex-1 border border-b-0 my-4 rounded-lg bg-white border-slate-300 shadow-lg shadow-black'>
                    <View className='flex-col py-4 px-3'>
                        <Text className='text-md  text-slate-800'>Số lần mua trong tháng</Text>
                        <Text className='text-2xl text-green-500'>
                            <CountUp isCounting formatter={(value) => value.toLocaleString()} end={count} duration={2} />
                        </Text>
                    </View>
                </View>

                <View className='h-32 flex-1 border border-b-0 my-4 rounded-lg bg-white border-slate-300 shadow-lg shadow-black'>
                    <View className='flex-col py-4 px-3 align-items-middle align-middle justify-between'>
                        <Text className='text-md bg-white text-slate-800'>
                            Tiền mua trong tháng
                        </Text>
                        <Text className='text-2xl text-green-500'>
                            <CountUp isCounting formatter={(value) => Math.floor(value).toLocaleString() + ' đ'} end={bought} duration={2} />
                        </Text>
                    </View>
                </View>
            </View>

            <View className='h-full bg-slate-50 flex-row px-6 rounded-lg'>
                <View>
                    <ImageSlider
                        data={[
                            { img: require('../assets/images/pharmacy_002.jpeg') },
                            { img: require('../assets/images/pharmacy_003.jpg') },
                            { img: require('../assets/images/pharmacy_001.jpg') },
                        ]}
                        localImg
                        autoPlay={true}
                        onItemChanged={(item) => console.log("item", item)}
                        closeIconColor="#fff"
                    />
                </View>
            </View>
        </>

    )
}