import ProfileCard from "@/components/profile-card";
import {StatusBar} from "expo-status-bar";
import {StyleSheet, ScrollView} from "react-native";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <StatusBar style="dark" />
        <ProfileCard name="Md. Salauddin" studentId="23-51479-1" department="Computer Science -AIUB" 
          bio="Passionate about coding and technology." skills= {["Python", "JavaScript"]}/>
    
        <ProfileCard name="Himel Kabir" studentId="23-51481-1" department="Computer Science -AIUB" 
          bio="Enthusiastic about software development and problem-solving." skills= {["Java", "C++"]}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F0F4F8",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },
});