import { Alert, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Home({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    a: '0',
    aHasil: 0,
    b: '0',
    bHasil: 0,
    data_index: 0
  });



  useEffect(() => {


    getData('user').then(res => {
      setUser(res);
    })
  }
    , []);





  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        height: windowHeight / 7,
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        paddingVertical: 20,
      }}>
        <View style={{
          flexDirection: 'row',
          marginBottom: 5,
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{

              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Selamat datang, {user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white
            }}>
              Kinematic Viscosity and
              Viscosity Index Calculator
            </Text>
          </View>


          <TouchableOpacity onPress={() => {
            storeData('user', null);

            navigation.replace('Login');
          }} style={{

            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type="ionicon" size={windowWidth / 30} name="log-out-outline" color={colors.primary} />
            <Text style={{
              left: 5,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              color: colors.primary
            }}>Keluar</Text>
          </TouchableOpacity>
        </View>



      </View>

      {/* calculator */}


      <ScrollView showsVerticalScrollIndicator={false} style={{
        padding: 10,
      }}>

        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,

          }}>
            <MyInput onChangeText={x => {
              setData({
                ...data,
                a: x
              })

              // })
              if (x > 31) {
                let a = parseFloat(x.toString());
                let aHasil = parseFloat(data.aHasil.toString());

                if (a >= 32 && a <= 38.7) {
                  aHasil = (0.3018 * a) - 7.8556;

                } else if (a >= 38.8 && a <= 49.1) {
                  aHasil = (0.3132 * a) - 8.288;
                } else if (a >= 49.2 && a <= 61.9) {
                  aHasil = (0.2954 * a) - 7.3931;
                } else if (a >= 62 && a <= 83.5) {
                  aHasil = (0.2618 * a) - 5.2774;
                } else if (a >= 83.6 && a <= 148.7) {
                  aHasil = (0.2311 * a) - 2.6417;
                } else if (a >= 148.9 && a <= 2316) {
                  aHasil = (0.2160 * a) - 0.1917;
                }
                setData({
                  ...data,
                  a: x,
                  aHasil: parseFloat(aHasil).toFixed(4)
                })



              }
            }} keyboardType='number-pad' value={data.a} iconname='create-outline' label="Viscometer Value at 40 °C (S)" />
          </View>
          <View style={{
            flex: 1,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              padding: 5,
              color: colors.primary,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 35
            }}>Kinematic Viscosity at 40 °C (cSt)</Text>
            <View style={{
              backgroundColor: colors.tertiary,
              width: '100%',
              borderRadius: 5,
              marginTop: 2,
              justifyContent: 'center',
              alignItems: 'center', height: 50,
            }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 15
              }}>{data.aHasil}</Text>
            </View>
          </View>

        </View>


        {/* Kinematic 100 */}


        <View style={{
          marginTop: 20,
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,

          }}>
            <MyInput value={data.b} onChangeText={x => {
              setData({
                ...data,
                b: x,
              })

              if (x > 31) {
                let b = parseFloat(x.toString());


                let bHasil = 0;


                if (b >= 32 && b <= 38.7) {
                  bHasil = (0.2993 * b) - 7.8386;
                } else if (b >= 38.8 && b <= 49.1) {
                  bHasil = (0.3112 * b) - 8.2899;
                } else if (b >= 49.2 && b <= 61.9) {
                  bHasil = (0.2934 * b) - 7.3873;
                } else if (b >= 62 && b <= 83.5) {
                  bHasil = (0.2606 * b) - 5.3134;
                } else if (b >= 83.6 && b <= 148.7) {
                  bHasil = (0.2296 * b) - 2.6448;
                } else if (b >= 148.9 && b <= 2316) {
                  bHasil = (0.2153 * b) - 0.1917;
                }

                setData({
                  ...data,
                  b: x,
                  bHasil: parseFloat(bHasil).toFixed(4)
                })



              } else {
                console.warn('Result', 0)
              }
            }} keyboardType='number-pad' iconname='create-outline' label="Viscometer Value at 100 °C (S)" />
          </View>
          <View style={{
            flex: 1,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              padding: 5,
              color: colors.primary,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 35
            }}>Kinematic Viscosity at 100 °C (cSt)</Text>
            <View style={{
              backgroundColor: colors.tertiary,
              width: '100%',
              borderRadius: 5,
              marginTop: 2,
              justifyContent: 'center',
              alignItems: 'center', height: 50,
            }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 15
              }}>{data.bHasil}</Text>
            </View>
          </View>

        </View>

        <MyGap jarak={20} />

        <MyButton Icons="refresh" title="Calculate" warna={colors.primary} onPress={
          () => {
            // INDEX
            var antilog = 0;
            if (data.bHasil >= 2 && data.bHasil <= 3.8) {
              antilog = ((0.84155 * data.bHasil * data.bHasil) + (1.5521 * data.bHasil)) - 0.077;
              console.Console;
            }
            else if (data.bHasil >= 3.81 && data.bHasil <= 4.4) { antilog = (0.78571 * data.bHasil * data.bHasil) + (1.7929 * data.bHasil) + -0.183 }
            else if (data.bHasil >= 4.41 && data.bHasil <= 5) { antilog = (0.82143 * data.bHasil * data.bHasil) + (1.5679 * data.bHasil) + 0.119 }
            else if (data.bHasil >= 5.01 && data.bHasil <= 6.4) { antilog = (0.04985 * data.bHasil * data.bHasil) + (9.1613 * data.bHasil) + -18.557 }
            else if (data.bHasil >= 6.41 && data.bHasil <= 7) { antilog = (0.22619 * data.bHasil * data.bHasil) + (7.7369 * data.bHasil) + -16.656 }
            else if (data.bHasil >= 7.01 && data.bHasil <= 7.7) { antilog = (0.79762 * data.bHasil * data.bHasil) + (-0.7321 * data.bHasil) + 14.61 }
            else if (data.bHasil >= 7.71 && data.bHasil <= 9) { antilog = (0.05794 * data.bHasil * data.bHasil) + (10.5156 * data.bHasil) + -28.24 }
            else if (data.bHasil >= 9.01 && data.bHasil <= 12) { antilog = (0.26665 * data.bHasil * data.bHasil) + (6.7015 * data.bHasil) + -10.81 }
            else if (data.bHasil >= 12.01 && data.bHasil <= 15) { antilog = (0.20073 * data.bHasil * data.bHasil) + (8.4658 * data.bHasil) + -22.49 }
            else if (data.bHasil >= 15.01 && data.bHasil <= 18) { antilog = (0.28889 * data.bHasil * data.bHasil) + (5.9741 * data.bHasil) + -4.93 }
            else if (data.bHasil >= 18.01 && data.bHasil <= 22) { antilog = (0.24504 * data.bHasil * data.bHasil) + (7.416 * data.bHasil) + -16.73 }
            else if (data.bHasil >= 22.01 && data.bHasil <= 28) { antilog = (0.20323 * data.bHasil * data.bHasil) + (9.1267 * data.bHasil) + -34.23 }
            else if (data.bHasil >= 28.01 && data.bHasil <= 40) { antilog = (0.18411 * data.bHasil * data.bHasil) + (10.1015 * data.bHasil) + -46.75 }
            else if (data.bHasil >= 40.01 && data.bHasil <= 55) { antilog = (0.17029 * data.bHasil * data.bHasil) + (11.4866 * data.bHasil) + -80.62 }
            else if (data.bHasil >= 55.01 && data.bHasil <= 70) { antilog = (0.1713 * data.bHasil * data.bHasil) + (11.368 * data.bHasil) + -76.94 }
            else if (data.bHasil >= 70.01) { antilog = (0.16841 * data.bHasil * data.bHasil) + (11.8493 * data.bHasil) + -96.947 }

            console.warn('antilog', parseFloat(antilog))

            var ResultAll = ((Math.pow(10, (Math.log(parseFloat(antilog).toFixed(4)) - Math.log(data.aHasil)) / Math.log(data.bHasil)) - 1) / 0.00715) + 100;

            console.warn('Result AA', ResultAll)

            setData({
              ...data,
              data_index: parseFloat(ResultAll).toFixed(4)
            })
          }
        } />

        <View style={{
          flex: 1,
          marginTop: 20,
          paddingLeft: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            padding: 5,
            color: colors.primary,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 35
          }}>Viscosity Index</Text>
          <View style={{
            backgroundColor: colors.tertiary,
            width: '100%',
            borderRadius: 5,
            marginTop: 2,
            justifyContent: 'center',
            alignItems: 'center', height: 50,
          }}>
            <Text style={{
              textAlign: 'center',
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 15
            }}>{data.data_index}</Text>
          </View>
        </View>
        <MyGap jarak={50} />
        <Text style={{
          textAlign: 'center',
          fontFamily: fonts.secondary[600],
          color: colors.border,
          margin: 5,
        }}>Base on ASTM D-2161 & ASTM D-2270</Text>
      </ScrollView>










    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 35
  },
  item: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 35
  }
})