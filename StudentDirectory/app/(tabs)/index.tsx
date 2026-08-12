import { FlatList, ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import StudentItem from "@/components/student-item";
import { Student, STUDENTS } from "@/data/students";
import SearchBar from "@/components/search-bar";
import StudentDetail from "@/components/student-details";
import AddStudentForm from "@/components/add-student-form"; // NEW
import { useState } from "react";

export default function HomeScreen() {
    const [query, setQuery] = useState<string>("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    
    // NEW: local state to handle dynamic list and toggling form view
    const [students, setStudents] = useState<Student[]>(STUDENTS);
    const [showForm, setShowForm] = useState(false);

    const handleSelect = (student: Student) => {
        setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
    };

    // NEW: New Student Handing (Lifting State Up)
    const handleNewStudent = (newStudent: Student) => {
        setStudents((prev) => [newStudent, ...prev]); // নতুন স্টুডেন্ট লিস্টের একদম উপরে যোগ হবে
        setShowForm(false);
    };

    // Derived value: filter using dynamic 'students' state instead of constant STUDENTS
    const filtered = students.filter((s) => {
        return (
            s.name.toLowerCase().includes(query.toLowerCase()) || 
            s.department.toLowerCase().includes(query.toLowerCase())
        );
    });

    // Conditional rendering for the Form view
    if (showForm) {
        return <AddStudentForm onSubmitSuccess={handleNewStudent} onCancel={() => setShowForm(false)} />;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Student Directory</Text>
                {/* NEW: Title bar এ নতুন স্টুডেন্ট অ্যাড করার বাটন */}
                <Pressable style={styles.addButton} onPress={() => setShowForm(true)}>
                    <Text style={styles.addButtonText}>+ Add</Text>
                </Pressable>
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
    container: { flex: 1, backgroundColor: "#F0F4F8" },
    titleBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, backgroundColor: "#0D1F4E" },
    title: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
    addButton: { backgroundColor: "#0D9488", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    addButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
    empty: { padding: 40, alignItems: "center" },
    emptyText: { fontSize: 14, color: "#94A3B8" },
});