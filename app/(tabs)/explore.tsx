import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { Card, Text, Button, TextInput } from 'react-native-paper';

const Explore = () => {
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Takane & Hana',
      description: 'Kisah romantis antara Takane dan Hana.',
      genre: 'Romance',
      penulis: 'Yuki Shiwasu',
      coverImage: 'https://i.pinimg.com/736x/e6/69/88/e6698871355b57d4fafe2cd9ebab2ce9.jpg',
    },
    {
      id: '2',
      title: 'First Love dengan Jejaka Moe',
      description:
        'Cerita cinta pertama yang manis. Pilihan yang sulit antara cinta pertama dan cinta sejati.',
      genre: 'Romance',
      penulis: 'helga rif',
      coverImage: 'https://i.pinimg.com/736x/4b/37/8e/4b378ef90a746097d21f143fe5da640a.jpg',
    },
    {
      id: '3',
      title: 'Naruto',
      description:
        'Petualangan seorang ninja muda. Naruto bercerita tentang seorang ninja muda yang bercita-cita menjadi Hokage, pemimpin desa ninja terkuat di desanya.',
      genre: 'Action',
      penulis: 'masashi kishimoto',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg',
    },
    {
      id: '4',
      title: 'One Piece',
      description:
        'Perjalanan bajak laut untuk menemukan harta karun legendaris. One Piece bercerita tentang Monkey D. Luffy, seorang anak laki-laki yang bercita-cita menjadi Raja Bajak Laut.',
      genre: 'Action',
      penulis: 'Eiichiro Oda',
      coverImage: 'https://i.pinimg.com/736x/51/68/9f/51689f55a1e45f9d59b054e729aa6fba.jpg',
    },
    {
      id: '5',
      title: 'Batman',
      description: 'Pahlawan malam dari Gotham City.',
      genre: 'Action',
      coverImage: 'https://i.pinimg.com/736x/c8/b9/50/c8b950b47ec398b93a5516b4cbb31d03.jpg',
    },
    {
      id: '6',
      title: 'Ultraman',
      description:
        'Pahlawan dari alam semesta alternatif. Ultraman adalah pahlawan super dari Nebula M78 yang datang ke Bumi untuk melindungi umat manusia dari monster-monster jahat.',
      genre: 'Sci-Fi',
      penulis: 'Eiji Tsuburaya',
      coverImage: 'https://i.pinimg.com/736x/9f/fe/5e/9ffe5e6b44cf9dffa599c82081f7be2a.jpg',
    },
    {
      id: '7',
      title: 'Deadpool',
      description:
        'Pahlawan super dengan sentuhan komedi. Deadpool memiliki nama asli Wade Wilson, seorang tentara bayaran Kanada yang mengalami mutasi regeneratif untuk menyembuhkan kanker stadium akhir.',
      genre: 'Comedy Action',
      penulis: 'Rob Liefeld',
      coverImage: 'https://i.pinimg.com/736x/22/31/0c/22310c3b8caccd9971dd25ebe7269213.jpg',
    },
    {
      id: '8',
      title: 'One Punch Man',
      description:
        'Superhero yang bisa mengalahkan lawan dengan satu pukulan. Bisa mengalahkan monster dengan satu pukulan saja, membuat Saitama bosan karena tidak ada yang bisa menantangnya.',
      genre: 'Action comedy ',
      penulis: 'Yusuke Murata',
      coverImage: 'https://i.pinimg.com/736x/cc/18/f1/cc18f109010a6a1c3d4a7e628b494367.jpg',
    },
  ]);

  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = (id) => {
    Alert.alert(
      'Hapus Item',
      'Apakah Anda yakin ingin menghapus item ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () =>
            setData((prevData) => prevData.filter((item) => item.id !== id)),
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = () => {
    setData((prevData) =>
      prevData.map((comic) =>
        comic.id === editingItem.id ? editingItem : comic
      )
    );
    setEditingItem(null);
  };

  const handleChange = (field, value) => {
    setEditingItem((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={{ flex: 1 }}>
      {editingItem ? (
        <View style={styles.editContainer}>
          <TextInput
            label="Title"
            value={editingItem.title}
            onChangeText={(value) => handleChange('title', value)}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={editingItem.description}
            onChangeText={(value) => handleChange('description', value)}
            style={styles.input}
          />
          <TextInput
            label="Genre"
            value={editingItem.genre}
            onChangeText={(value) => handleChange('genre', value)}
            style={styles.input}
          />
          <TextInput
            label="Penulis"
            value={editingItem.penulis}
            onChangeText={(value) => handleChange('penulis', value)}
            style={styles.input}
          />
          <View style={styles.actionButtons}>
            <Button mode="contained" onPress={handleSaveEdit} style={styles.button}>
              Simpan
            </Button>
            <Button mode="outlined" onPress={() => setEditingItem(null)} style={styles.button}>
              Batal
            </Button>
          </View>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.coverImage }} style={styles.coverImage} />
              <Card.Content>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.genre}>Genre: {item.genre}</Text>
                {item.penulis && <Text style={styles.penulis}>Penulis: {item.penulis}</Text>}
              </Card.Content>
              <Card.Actions style={styles.actions}>
                <Button onPress={() => handleEdit(item)}>Edit</Button>
                <Button onPress={() => handleDelete(item.id)} color="red">
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 8,
  },
  coverImage: {
    height: 300,
    width: 200,
    borderRadius: 4,
    marginRight: 12,
    marginLeft: 550,
    marginTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  genre: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  penulis: {
    fontSize: 12,
    color: '#777',
  },
  editContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: 8,
  },
});

export default Explore;
