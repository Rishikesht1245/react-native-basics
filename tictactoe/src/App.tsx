import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

export default function App(): JSX.Element {
  // for tracking the turn of which player
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');

  // new array of 9 elements and empty fields
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombinations) {
      if (gameState[a] !== 'empty' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        setGameWinner(gameState[a]);
        return;
      }
    }

    // Check for tie
    if (gameState.every(cell => cell !== 'empty') && !gameWinner) {
      setGameWinner('Tie');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return; // Do nothing if the game is over
    }

    if (gameState[itemNumber] === 'empty') {
      const newGameState = [...gameState];
      newGameState[itemNumber] = isCross ? 'cross' : 'circle';
      setGameState(newGameState);
      setIsCross(!isCross);
      checkIsWinner(); // Check winner based on updated state
    } else {
      Snackbar.show({
        text: 'Position is already filled!',
        backgroundColor: 'red',
        textColor: '#FFFFFF',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  // useEffect to show Snackbar message based on gameWinner
  useEffect(() => {
    if (gameWinner) {
      Snackbar.show({
        text: gameWinner === 'Tie' ? 'It\'s a tie!' : `${gameWinner} won the game! 😂`,
        backgroundColor: gameWinner === 'Tie' ? 'orange' : 'green',
        textColor: '#FFFFFF',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [gameWinner]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar />
      <View style={styles.sectionContaier}>
        <Text style={styles.sectionText}>React Native Tic-Tac-Toe</Text>
        <View style={styles.gameContainer}>
          <Text style={styles.playerText}>
            {isCross && !gameWinner ? 'Player X turn' : gameWinner ? `${gameWinner} won the Game! 😂😂` : 'Player O turn'}
          </Text>
          <FlatList
            numColumns={3}
            data={gameState}
            contentContainerStyle={{ gap: 16 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ index, item }) => (
              <Pressable
                style={[styles.btn]}
                onPress={() => onChangeItem(index)}
              >
                <Icons name={item} />
              </Pressable>
            )}
          />
          <TouchableOpacity style={styles.reloadBtn} onPress={reloadGame}>
            <Text style={styles.reloadTxt}>
              {gameWinner ? 'Start New Game' : 'Reload Game'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContaier: {
    paddingVertical: 28,
    padding: 10,
    height: 'auto',
    display: 'flex',
  },
  sectionText: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  gameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  playerText: {
    fontSize: 20,
    color: 'yellow',
    textAlign: 'center',
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255,234,0,0.9)',
    padding: 20,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    margin: 3,
  },
  reloadBtn: {
    width: 'auto',
    padding: 10,
    backgroundColor: 'rgba(0,255,0,0.6)',
    borderRadius: 5,
  },
  reloadTxt: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
