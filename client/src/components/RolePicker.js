import React from 'react';

import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';

const RolePicker = ({ selectedRole, onRoleChange }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Picker
        selectedValue={selectedRole}
        onValueChange={(itemValue) => onRoleChange(itemValue)}
      >
        <Picker.Item label="Select Role" value="" />
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="Staff" value="Staff" />
        <Picker.Item label="User" value="User" />
      </Picker>
    </View>
  );
};

export default RolePicker;
