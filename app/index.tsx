import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";

import { useEffect, useState } from "react";
import { theme } from "../theme";
import { getFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "shopping-list";

type ShoppingListItemType = {
  id: string;
  name: string;
  completed: boolean;
};

export default function App() {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState<ShoppingListItemType[]>([]);

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(STORAGE_KEY);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setList(data);
      }
    };

    fetchInitial();
  }, []);

  const sortedList = list.sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  const handleSubmit = () => {
    if (inputText) {
      const newShoppingList = [
        { id: new Date().toISOString(), name: inputText, completed: false },
        ...list,
      ];
      setList(newShoppingList);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setInputText("");
      saveToStorage(STORAGE_KEY, newShoppingList);
      console.log(getFromStorage(STORAGE_KEY));
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = list.filter((item) => item.id !== id);
    setList(newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    saveToStorage(STORAGE_KEY, newShoppingList);
  };

  const handleToggle = (id: string) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setList(newList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    saveToStorage(STORAGE_KEY, newList);
  };

  return (
    <FlatList
      data={sortedList}
      renderItem={({ item }) => (
        <ShoppingListItem
          key={item.id}
          item={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggle(item.id)}
          isCompleted={item.completed}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>List is empty</Text>
        </View>
      }
      stickyHeaderIndices={[0]}
      style={styles.container}
      ListHeaderComponent={
        <TextInput
          placeholder="e.g. Coffee"
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
