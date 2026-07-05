import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import FormField from "./form-field";
import { Student } from "../data/students";

interface AddStudentFormProps {
  onSubmitSuccess: (student: Student) => void;
  onCancel: () => void; 
}

interface FormData {
  name: string;
  studentId: string;
  department: string;
  bio: string;
  skillsText: string;
  email: string; 
}

interface FormErrors {
  name?: string;
  studentId?: string;
  department?: string;
  bio?: string;
  email?: string; 
}

function validateForm(data: FormData): FormErrors {
  const newErrors: FormErrors = {};

  if (data.name.trim().length === 0) newErrors.name = "Name is required.";
  else if (data.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";

  const idPattern = /^\d{2}-\d{5}-\d$/;
  if (data.studentId.trim().length === 0) newErrors.studentId = "Student ID is required.";
  else if (!idPattern.test(data.studentId.trim())) newErrors.studentId = "Format must be NN-NNNNN-N (e.g. 22-12345-1).";

  if (data.department.trim().length === 0) newErrors.department = "Department is required.";

  if (data.bio.trim().length === 0) newErrors.bio = "Bio is required.";
  else if (data.bio.trim().length < 10) newErrors.bio = "Bio must be at least 10 characters.";
  else if (data.bio.trim().length > 200) newErrors.bio = "Bio cannot exceed 200 characters."; // Sub-task 10.2

  // Sub-task 10.1: Email Validation Regex
  const emailPattern = /^\S+@\S+\.\S+$/;
  if (data.email.trim().length === 0) newErrors.email = "Email is required.";
  else if (!emailPattern.test(data.email.trim())) newErrors.email = "Invalid email format.";

  return newErrors;
}

export default function AddStudentForm({ onSubmitSuccess, onCancel }: AddStudentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    studentId: "",
    department: "",
    bio: "",
    skillsText: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const markTouched = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    setErrors(validateForm(formData));
  }, [formData]);

  const isFormValid = Object.keys(errors).length === 0 && formData.name.length > 0 && formData.studentId.length > 0 && formData.email.length > 0;

  // Submit Effect with Cleanup function
  useEffect(() => {
    if (!submitTrigger) return;

    const timeoutId = setTimeout(() => {
      const newStudent: Student = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        studentId: formData.studentId.trim(),
        department: formData.department.trim(),
        bio: formData.bio.trim(),
        skills: formData.skillsText.split(",").map((s) => s.trim()).filter((s) => s.length > 0),
        avatarUrl: "https://i.pravatar.cc/150?u=" + Date.now(),
      };

      setIsSubmitting(false);
      setSubmitTrigger(false);
      onSubmitSuccess(newStudent);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [submitTrigger]);

  const handleSubmitPress = () => {
    setTouched({ name: true, studentId: true, department: true, bio: true, email: true });
    setSubmitAttempted(true);
    if (isFormValid) {
      setIsSubmitting(true);
      setSubmitTrigger(true);
    }
  };

  const handleCancelPress = () => {
    const hasTyped = Object.values(formData).some((value) => value.trim().length > 0);
    if (hasTyped) {
      Alert.alert("Discard Changes?", "You have unsaved changes. Do you want to discard them?", [
        { text: "No", style: "cancel" },
        { text: "Yes, Discard", style: "destructive", onPress: onCancel },
      ]);
    } else {
      onCancel();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Join the Directory</Text>
      <Text style={styles.subheading}>Fill in your details below to add yourself.</Text>

      <FormField label="Full Name" value={formData.name} onChangeText={(text) => updateField("name", text)} onBlur={() => markTouched("name")} error={touched.name || submitAttempted ? errors.name : undefined} placeholder="e.g. Md Salauddin" />
      <FormField label="Student ID" value={formData.studentId} onChangeText={(text) => updateField("studentId", text)} onBlur={() => markTouched("studentId")} error={touched.studentId || submitAttempted ? errors.studentId : undefined} placeholder="e.g. 23-51479-1" autoCapitalize="none" />
      <FormField label="Email" value={formData.email} onChangeText={(text) => updateField("email", text)} onBlur={() => markTouched("email")} error={touched.email || submitAttempted ? errors.email : undefined} placeholder="e.g. student@aiub.edu" autoCapitalize="none" />
      <FormField label="Department" value={formData.department} onChangeText={(text) => updateField("department", text)} onBlur={() => markTouched("department")} error={touched.department || submitAttempted ? errors.department : undefined} placeholder="e.g. Computer Science" />

      {/* Bio Field */}
      <FormField label="Bio" value={formData.bio} onChangeText={(text) => updateField("bio", text)} onBlur={() => markTouched("bio")} error={touched.bio || submitAttempted ? errors.bio : undefined} placeholder="A short sentence about yourself..." multiline />

      {/* Sub-task 10.2: Bio Character Counter */}
      <Text style={[styles.charCounter, formData.bio.length > 200 && styles.charCounterError]}>
        {formData.bio.length} / 200 characters
      </Text>

      <FormField label="Skills (comma-separated)" value={formData.skillsText} onChangeText={(text) => updateField("skillsText", text)} placeholder="e.g. React Native, TypeScript, Figma" autoCapitalize="none" />

      {/* Buttons Row */}
      <View style={styles.buttonRow}>
        <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancelPress}>
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.submitButton, !isFormValid && styles.buttonDisabled]} onPress={handleSubmitPress} disabled={!isFormValid || isSubmitting}>
          {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Join Directory</Text>}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", padding: 20 },
  heading: { fontSize: 20, fontWeight: "800", color: "#0D1F4E", marginBottom: 4 },
  subheading: { fontSize: 13, color: "#64748B", marginBottom: 24, lineHeight: 19 },
  charCounter: { fontSize: 12, color: "#64748B", textAlign: "right", marginTop: -12, marginBottom: 16 },
  charCounterError: { color: "#EF4444", fontWeight: "bold" },
  buttonRow: { flexDirection: "row", gap: 12, marginTop: 8, marginBottom: 32 },
  button: { flex: 1, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  submitButton: { backgroundColor: "#0D9488" },
  cancelButton: { backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#CBD5E1" },
  buttonDisabled: { backgroundColor: "#CBD5E1" },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  cancelButtonText: { color: "#475569" },
});