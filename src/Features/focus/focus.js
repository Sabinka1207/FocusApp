import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RoundedBtn } from "../../Components/RoundedButton";
import { getStorage, setStorage, clearStorage } from "../../utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTaskName, setTaskList } from "../../redux/slice";

export const Focus = ({ navigation }) => {
  const tasks = useSelector((state) => state.taskStatus.taskList);
  const dispatch = useDispatch();
  const [text, setChangeText] = React.useState("");

  useEffect(async () => {
    const data = await getStorage();
    if (data != null) {
      if (data.length) {
        dispatch(setTaskList(data));
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length) {
      setStorage(tasks);
    }
  }, [tasks]);

  const addFocusTask = () => {
    const updateData = [...tasks, text];
    dispatch(setTaskList(updateData));
    setChangeText("");
  };

  const clearTasks = () => {
    dispatch(setTaskList([]));
    clearStorage();
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}> What would you like focus on? </Text>
        <View style={styles.form}>
          <TextInput
            onChangeText={setChangeText}
            value={text}
            style={styles.focusInput}
          ></TextInput>
          <RoundedBtn onPress={addFocusTask} size={50} name={"+"} />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Things we've focused on </Text>
        <View style={styles.tasksList}>
          {tasks.length ? (
            tasks.map((task) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setCurrentTaskName(task));
                  navigation.navigate("Timer");
                }}
                key={task}
              >
                <Text style={(styles.tasksListItem, styles.tasksListItemBtn)}>
                  {task}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.tasksListItem}>Nothing yet</Text>
          )}
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#0a003b",
          paddingBottom: 50,
        }}
      >
        <RoundedBtn onPress={clearTasks} size={50} name={"clear"} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 50,
    backgroundColor: "#0a003b",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  focusInput: {
    width: "85%",
    height: 50,
    marginRight: 5,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  tasksList: {},
  tasksListItem: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
    color: "white",
  },
  tasksListItemBtn: {
    width: 300,
    height: 30,
    marginTop: 5,
    fontSize: 17,
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "green",
    overflow: "hidden",
  },
});
