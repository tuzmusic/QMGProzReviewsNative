import React, { Component } from "react";
import { View, Text } from "react-native";
import { Rating } from "react-native-elements";
import User from "../models/User";

export default ReviewView = ({ review }) => {
  const author = User.fromCustomApi(review.author);
  return (
    <View style={styles.reviewContainer}>
      <Rating
        readonly
        startingValue={review.rating}
        style={styles.rating}
        imageSize={20}
      />
      {/* <Text style={styles.dateText}>{review.timePast}</Text> */}
      <Text style={styles.contentText}>{review.content}</Text>
      <Text style={styles.userText}>
        – {author.fullName || author.username}
      </Text>
    </View>
  );
};

const styles = {
  reviewContainer: {
    paddingVertical: 15,
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: "lightgrey"
  },
  contentText: { fontStyle: "italic", fontSize: 18, marginVertical: 15 },
  userText: { fontSize: 18, textAlign: "right" },
  dateText: { fontSize: 18, textAlign: "left" },
  rating: { paddingBottom: 5, alignItems: "flex-start" }
};
