import React from "react";
import { View, FlatList } from "react-native";
import { Text, Button } from "react-native-elements";

export default ReviewsList = ({ customer, onStartReviewPress }) => {
  const { reviews } = customer;
  return (
    <View>
      <View style={styles.headerSection(reviews)}>
        <Text h4>Reviews ({reviews.length})</Text>
        <Button title="Leave a Review" onPress={onStartReviewPress} />
      </View>
      {!reviews.length ? (
        <Text style={styles.noReviewsText}>No reviews yet.</Text>
      ) : (
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <ReviewView review={item} key={String(item.id)} />
          )}
        />
      )}
    </View>
  );
};

const styles = {
  headerSection: reviews => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: reviews.length ? 15 : 30
  }),
  noReviewsText: { textAlign: "left", paddingTop: 20, paddingLeft: 5 }
};
