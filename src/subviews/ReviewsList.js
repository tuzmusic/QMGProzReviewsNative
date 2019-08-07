import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";

export default ReviewsList = ({ customer, onStartReviewPress }) => {
  const { reviews } = customer;
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: reviews.length ? 15 : 30
        }}
      >
        <Text h2>Reviews</Text>
        <Button title="Leave a Review" onPress={onStartReviewPress} />
      </View>
      {!reviews.length && (
        <Text style={{ textAlign: "left", paddingTop: 20, paddingLeft: 5 }}>
          No reviews yet.
        </Text>
      )}
      {reviews.map((review, i) => (
        <ReviewView review={review} key={i} />
      ))}
    </View>
  );
};
