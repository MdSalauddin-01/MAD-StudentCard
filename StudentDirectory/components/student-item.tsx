import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Student } from "../data/students";
 
interface StudentItemProps {
  student: Student;
  onPress: (student: Student) => void;
  isSelected: boolean;
}
 
export default function StudentItem({ student, onPress, isSelected }: StudentItemProps) {
  return (
    <TouchableOpacity
      style={[styles.row, isSelected && styles.rowSelected]}
      onPress={() => onPress(student)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: student.avatarUrl }}
        style={styles.avatar}
        resizeMode="cover"
      />
 
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {student.name}
        </Text>
        <Text style={styles.department} numberOfLines={1}>
          {student.department}
        </Text>
        <Text style={styles.id}>ID: {student.studentId}</Text>
      </View>
 
      <Text style={styles.chevron}>{isSelected ? "▲" : "▶"}</Text>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",       
    alignItems: "center",        
    paddingVertical: 12,
    paddingHorizontal: 16,
   backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  rowSelected: {
    backgroundColor: "#E1F5EE",  
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,            
    marginRight: 14,
  },
  info: {
    flex: 1,                     
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0D1F4E",
    marginBottom: 2,
  },
  department: {
    fontSize: 12,
    color: "#0D9488",
    marginBottom: 2,
  },
  id: {
    fontSize: 11,
    color: "#94A3B8",
  },
  chevron: {
    fontSize: 12,
    color: "#CBD5E1",
    marginLeft: 8,
  },
});
