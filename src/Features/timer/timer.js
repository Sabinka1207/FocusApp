import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import { RoundedBtn } from "../../Components/RoundedButton";
import { Countdown } from "../../Components/Countdown";

const TIME = {
  min: 5,
  med: 30,
  max: 60,
};

const Separator = () => <View style={styles.separator} />;

export const Timer = ({ navigation }) => {
  // taskName, openTask;
  const taskName = useSelector((state) => state.taskStatus.currentTaskName);
  console.log(taskName);
  const [timeLeft, setTimeLeft] = useState(0);
  const [paused, setPaused] = useState(true);
  const interval = useRef(null);

  useEffect(() => {
    if (interval.current === null && !paused) {
      interval.current = setInterval(countDown, 1000);
    }
    setTimeLeft(timeLeft);
  }, [timeLeft, paused]);

  useEffect(() => {
    if (paused) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [paused]);

  const countDown = () => {
    setTimeLeft((time) => {
      if (time === 1) {
        startPauseBtn();
      }
      if (time === 0) {
        clearInterval(interval.current);
        interval.current = null;
        return time;
      }
      return time - 1;
    });
  };

  const startPauseBtn = () => {
    if (timeLeft) {
      setPaused(!paused);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.clockContainer}>
          <Countdown timeLeft={timeLeft} />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}> Focusing on: </Text>
          <Text style={styles.taskName}> {taskName} </Text>
        </View>
      </View>
      <Separator />
      <View style={styles.container}>
        <View style={styles.timeButtons}>
          <RoundedBtn
            name={TIME.min}
            size={50}
            onPress={() => setTimeLeft(TIME.min)}
          />
          <RoundedBtn
            name={TIME.med}
            size={50}
            onPress={() => setTimeLeft(TIME.med)}
          />
          <RoundedBtn
            name={TIME.max}
            size={50}
            onPress={() => setTimeLeft(TIME.max)}
          />
        </View>
        <View style={styles.pauseButonContainer}>
          <RoundedBtn
            name={paused ? "start" : "pause"}
            size={100}
            onPress={() => startPauseBtn()}
          />
        </View>
        <View style={styles.exitContainer}>
          <RoundedBtn
            name={"-"}
            size={50}
            onPress={() => navigation.navigate("Focus")}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#0a003b",
  },
  separator: {
    borderBottomColor: "#4c8bc7",
    borderBottomWidth: 5,
  },
  text: {
    marginTop: 5,
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  taskName: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  clockContainer: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  timeButtons: {
    flex: 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  pauseButonContainer: {
    flex: 2,
    alignItems: "center",
  },
});
