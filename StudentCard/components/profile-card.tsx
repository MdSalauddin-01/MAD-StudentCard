import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';

interface ProfileCardProps {
  name: string;
  studentId: string;
  department: string;
  bio: string;
  skills: string[];
}
export default function ProfileCard({ name, studentId, department, bio, skills }: ProfileCardProps) {
    const initials = name.split(" ").map((word)=> word[0]).join("");             

    const [followed,setFollowed] = useState(false);

    const handleFollow = () => {
        setFollowed(!followed);
    };
  return (
    <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

            <Text style={styles.name}>{name}</Text>
            <Text style={styles.idBadge}>ID: {studentId}</Text>
            <Text style={styles.role}>{department}</Text>

            <View style={styles.divider} />

            <Text style={styles.bio}>{bio}</Text>

           
            <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                    <view key={index} style={styles.skillBadge}>
                        <Text style={styles.skillText}>{skill}</Text>
                    </view>

                ))}
            </View>

        <TouchableOpacity 
            style={[styles.button, followed && styles.buttonFollowed]} 
        onPress={handleFollow}>
            
            <Text style={[styles.buttonText, followed && styles.buttonTextFollowed]}>
                {followed ? 'Following ✓' : "Follow"}
            </Text>
           
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        width: "88%",
        padding: 28,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 20,
      },
    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: "#0D9488",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "bold",
        },
    name: { 
        fontSize: 22,
        fontWeight: "bold",
        color: "#0D1F4E",
        marginBottom: 2,
        },
    idBadge: {
        fontSize: 12,
        color: "#0D9488",
        backgroundColor: "#E1F5EE",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
        marginBottom: 4,
        overflow: "hidden",
    },
    role: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 16,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#E2E8F0",
        marginBottom: 16,
    },
    bio: {
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
    },
    button: {
        marginTop: 20,
        backgroundColor: "transparent",
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#0D9488",
    },
    buttonFollowed: {
        backgroundColor: "#0D9488",
    },
    buttonText: {
        color: "#0D9488",
        fontSize: 14,
        fontWeight: "600",
    },
    buttonTextFollowed: {
        color: "#FFFFFF",
    },
    skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 12,
        gap: 8,
    },
    skillBadge: {
        backgroundColor: "#EFF6FF",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#BFDBFE",
    },
    skillText: {
        color: "#1D4ED8",
        fontSize: 12,
        fontWeight: "500",
    },
});