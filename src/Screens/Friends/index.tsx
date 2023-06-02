import React, { useEffect, useState, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { SafeAreaView, FlatList } from "react-native";
import { style } from "./style";
import api from "../../services/api";
import { getAuthHeader } from "../../services/auth";
import { ProfileItem } from "../../components/ProfileItem";
import { Profile } from "../../models/Profile";

function Friends() {
    const { userId } = useContext(AuthContext);
    const [profilesList, setProfilesList] = useState([]);

    useEffect(() => {
        const getProfiles = async () => {
            try {
                const response: Profile[] = await (await api.get("/user", await getAuthHeader())).data
                setProfilesList(response.filter(prof => prof.id != userId))
            } catch (error) {

            }
        }

        getProfiles();
    }, []);

    async function handleFollow(profileEmail: string) {
        try {
            await api.post(`/user/follow/${profileEmail}`, null, await getAuthHeader());
            const response = (await api.get(`/user/${profileEmail}`, await getAuthHeader())).data;
            setProfilesList((profiles) => {
                const newProfiles = profiles.map(profile => {
                    if (profile.email === profileEmail) {
                        profile.followers = response[0].followers;
                    }
                    return profile;
                })
                return [...newProfiles];
            })
        } catch (error) {
            console.log("Erro ao tentar seguir perfil.")
        }
    }

    async function handleUnFollow(profileEmail: string) {
        try {
            await api.post(`/user/unfollow/${profileEmail}`, null, await getAuthHeader());
            const response = (await api.get(`/user/${profileEmail}`, await getAuthHeader())).data;
            setProfilesList((profiles) => {
                const newProfiles = profiles.map(profile => {
                    if (profile.email === profileEmail) {
                        profile.followers = response[0].followers;
                    }
                    return profile;
                })
                return [...newProfiles];
            })
        } catch (error) {
            console.log("Erro ao tentar seguir perfil.")
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <FlatList
                data={profilesList}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <ProfileItem profile={item} handleFollowAction={handleFollow} handleUnFollowAction={handleUnFollow} />
                )}
            >

            </FlatList>
        </SafeAreaView>
    );
}

export default Friends;