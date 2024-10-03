import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { theme } from "../theme";

export function ShoppingListItem({
  item,
  isCompleted,
  onDelete,
  onToggleComplete,
}: {
  item: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
}) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${item}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => onDelete(),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={onToggleComplete}
    >
      <Entypo
        name={isCompleted ? "check" : "circle"}
        size={24}
        color={isCompleted ? theme.colorGrey : theme.colorCerulean}
      />
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
        numberOfLines={1}
      >
        {item}
      </Text>
      <TouchableOpacity hitSlop={20} onPress={handleDelete}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  completedText: {
    color: theme.colorGrey,
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
    marginLeft: 8,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});
