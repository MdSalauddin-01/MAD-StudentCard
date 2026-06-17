import { FlatList, ScrollView, StyleSheet,TouchableOpacity, Text, View } from "react-native";
import StudentItem from "@/components/student-item";
import { Student, STUDENTS } from "@/data/students";
import SearchBar from "@/components/search-bar";
import StudentDetail from "@/components/student-details";
import { useState } from "react";


export default function HomeScreen() {
    const [query, setQuery] = useState<string>("");
    const [departmentFilter, setDepartmentFilter] = useState<string>("All");

    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const handleSelect = (student: Student) => {
        setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
    };

    const filtered = STUDENTS.filter((s) => {
        const matchesQuery =
           s.name.toLowerCase().includes(query.toLowerCase()) ||
           s.department.toLowerCase().includes(query.toLowerCase());

    const matchesDept =
          departmentFilter === "All" || s.department === departmentFilter;

  return matchesQuery && matchesDept;
});

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Student Directory</Text>
            </View>

            <View style={styles.tabRow}>
                 {["All", "Computer Science", "Software Engineering"].map((dept) => (
           <TouchableOpacity
               key={dept}
               style={[
               styles.tab,
               departmentFilter === dept && styles.tabActive,
               ]}
               onPress={() => setDepartmentFilter(dept)}>
          <Text
              style={[
              styles.tabText,
              departmentFilter === dept && styles.tabTextActive,]}>
                {dept}
          </Text>
          </TouchableOpacity>
          ))}
          </View>

            <SearchBar value={query} onChangeText={setQuery} />

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selectedStudent?.id === item.id} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No students match "{query}"</Text>
                    </View>
                }
            />
            {selectedStudent && <StudentDetail student={selectedStudent} />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#0D1F4E",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    count: {
        fontSize: 12,
        color: "#CCFBF1",
    },
    empty: {
        padding: 40,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 14,
        color: "#94A3B8",
    },
    tabRow: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        gap: 8,
    },
    tab: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#F1F5F9",
   },
   tabActive: {
        backgroundColor: "#0D9488",
   },
   tabText: {
        fontSize: 13,
        color: "#64748B",
        fontWeight: "500",
    },
    tabTextActive: {
        color: "#FFFFFF",
        fontWeight: "700",
},
});
