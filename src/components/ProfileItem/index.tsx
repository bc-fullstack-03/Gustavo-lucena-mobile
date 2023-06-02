import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { style } from "./style";
import { UserCircle } from "phosphor-react-native";
import { Button } from "../Button";
import { Profile } from "../../models/Profile";

interface ProfileProps {
    profile: Profile;
    handleFollowAction: (profileEmail: string) => void
    handleUnFollowAction: (profileEmail: string) => void
}

export function ProfileItem({ profile, handleFollowAction, handleUnFollowAction }: ProfileProps) {
    const { userId } = useContext(AuthContext);

    return (
        <View style={style.profileCard}>
            <View style={style.profileIdentification} >
                <UserCircle color="white" size={32} weight="thin" ></UserCircle>
                <Text style={style.profileNameText} >{profile.name}</Text>
            </View>
            <Text style={style.followers} >{profile.followers.length} seguidores</Text>
            <Text style={style.following} >Seguindo {profile.following.length} perfis</Text>

            {
                profile.followers.includes(userId) ?
                    (<Button style={style.unfollowButton} title="Deixar De Seguir" onPress={() => handleUnFollowAction(profile.email)}></Button>) :
                    (<Button title="Seguir" onPress={() => handleFollowAction(profile.email)}></Button>)
            }
        </View>

    )
}