import React, { Component } from "react";
import { View, Text } from "react-native";
import { Rating } from "react-native-elements";
import User from "../models/User";

export default ReviewView = ({ review }) => {
  const user = User.fromCustomApi(review.author);
  return (
    <View style={styles.reviewContainer}>
      <Rating
        readonly
        startingValue={review.rating}
        style={styles.rating}
        imageSize={20}
      />
      {<Text style={styles.dateText}>{review.timePast}</Text>}
      <Text style={styles.contentText}>{review.content}</Text>
      <Text style={styles.userText}>– {user.fullName || user.username}</Text>
    </View>
  );
};

const styles = {
  reviewContainer: { marginTop: 10, width: "100%" },
  contentText: { fontStyle: "italic", fontSize: 18 },
  userText: { fontSize: 18, textAlign: "right" },
  dateText: { fontSize: 18, textAlign: "left" },
  rating: { padding: 5, alignItems: "flex-start" }
};
