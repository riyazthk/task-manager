//guide connection to the server for chat
// const ws = new WebSocket('ws://localhost:3000');
// ws.onopen = () => {
//     // connection opened
//     ws.send('something'); // send a message
// };

// ws.onmessage = (e) => {
//     // a message was received
//     console.log(e.data);
// };

// ws.onerror = (e) => {
//     // an error occurred
//     console.log(e.message);
// };

// ws.onclose = (e) => {
//     // connection closed
//     console.log(e.code, e.reason);
// };

//guide for audio call and video call in react native

// const configuration = {
//     iceServers: [
//       {
//         urls: 'stun:stun.l.google.com:19302',
//       },
//     ],
//   };

//   const pc = new RTCPeerConnection(configuration);

//   pc.onicecandidate = (event) => {
//     // send the candidates to the remote peer
//     // see addCandidate below to be triggered on the remote peer
//     socket.emit('candidate', event.candidate);
//   };

//   pc.ontrack = (event) => {
//     // use event.streams[0]
//   };

//   // get a local stream, show it in a self-view and add it to be sent

//   navigator.mediaDevices
//     .getUserMedia({ audio: true, video: true })
//     .then((stream) => {
//       // use the stream
//       pc.addStream(stream);
//     });

//   // send any ice candidates to the other peer
//   socket.on('candidate', (candidate) => {
//     pc.addIceCandidate(new RTCIceCandidate(candidate));
//   });

//   // let the "negotiationneeded" event trigger offer generation
//   pc.onnegotiationneeded = () => {
//     pc.createOffer().then((offer) => {
//       return pc.setLocalDescription(offer);
//     })
//     .then(() => {
//       // send the offer to the other peer
//       socket.emit('offer', pc.localDescription);
//     })
//   };

//   socket.on('offer', (offer) => {
//     pc.setRemoteDescription(new RTCSessionDescription(offer))
//       .then(() => {
//         return pc.createAnswer();
//       })
//       .then((answer) => {
//         return pc.setLocalDescription(answer);
//       })
//       .then(() => {
//         // send the answer to the other peer
//         socket.emit('answer', pc.localDescription);
//       });
//   });

//   socket.on('answer', (answer) => {
//     pc.setRemoteDescription(new RTCSessionDescription(answer));
//   });

//   // create offer
//   pc.createOffer().then((offer) => {
//     return pc.setLocalDescription(offer);
//   })
//   .then(() => {
//     // send the offer to the other peer
//     socket.emit('offer', pc.localDescription);
//   });

//   // when remote adds a stream, hand it on to the local video element
//   pc.onaddstream = (event) => {
//     remoteView.srcObject = event.stream;
//   };

//   // call start() to initiate
//   function start() {
//     pc.createOffer().then((offer) => {
//       return pc.setLocalDescription(offer);
//     })
//     .then(() => {
//       // send the offer to the other peer
//       socket.emit('offer', pc.localDescription);
//     });
//   }

//   // call hangup() to terminate
//   function hangup() {
//     pc.close();
//     pc = null;
//   }

//   // when remote sends an ice candidate to us, add it to the peer connection
//   socket.on('candidate', (candidate) => {
//     pc.addIceCandidate(new RTCIceCandidate(candidate));
//   });

//   // when remote sends an answer to us, set it as remote description
//   socket.on('answer', (answer) => {
//     pc.setRemoteDescription(new RTCSessionDescription(answer));
//   });

//   // when starting, we need to wait for a remote stream to arrive
//   pc.onaddstream = (event) => {
//     remoteView.srcObject = event.stream;
//   };

//   // call start() to initiate
//   function start() {
//     pc.createOffer().then((offer) => {
//       return pc.setLocalDescription(offer);
//     })
//     .then(() => {
//       // send the offer to the other peer
//       socket.emit('offer', pc.localDescription);
//     });
//   }

//   // call hangup() to terminate
//   function hangup() {
//     pc.close();
//     pc = null;
//   }

//create chat , video , audio call like whats app in react native

const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const pc = new RTCPeerConnection(configuration);

pc.onicecandidate = (event) => {
  // send the candidates to the remote peer
  // see addCandidate below to be triggered on the remote peer
  socket.emit("candidate", event.candidate);
};

pc.ontrack = (event) => {
  // use event.streams[0]
};

// get a local stream, show it in a self-view and add it to be sent

navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then((stream) => {
    // use the stream
    pc.addStream(stream);
  });

// send any ice candidates to the other peer
socket.on("candidate", (candidate) => {
  pc.addIceCandidate(new RTCIceCandidate(candidate));
});

// let the "negotiationneeded" event trigger offer generation
pc.onnegotiationneeded = () => {
  pc.createOffer()
    .then((offer) => {
      return pc.setLocalDescription(offer);
    })
    .then(() => {
      // send the offer to the other peer
      socket.emit("offer", pc.localDescription);
    });
};

socket.on("offer", (offer) => {
  pc.setRemoteDescription(new RTCSessionDescription(offer))
    .then(() => {
      return pc.createAnswer();
    })
    .then((answer) => {
      return pc.setLocalDescription(answer);
    })
    .then(() => {
      // send the answer to the other peer
      socket.emit("answer", pc.localDescription);
    });
});

socket.on("answer", (answer) => {
  pc.setRemoteDescription(new RTCSessionDescription(answer));
});

// create offer
pc.createOffer()
  .then((offer) => {
    return pc.setLocalDescription(offer);
  })
  .then(() => {
    // send the offer to the other peer
    socket.emit("offer", pc.localDescription);
  });

// when remote adds a stream, hand it on to the local video element
pc.onaddstream = (event) => {
  remoteView.srcObject = event.stream;
};

// call start() to initiate
function start() {
  pc.createOffer()
    .then((offer) => {
      return pc.setLocalDescription(offer);
    })
    .then(() => {
      // send the offer to the other peer
      socket.emit("offer", pc.localDescription);
    });
}

// call hangup() to terminate
function hangup() {
  pc.close();
  pc = null;
}

// when remote sends an ice candidate to us, add it to the peer connection
socket.on("candidate", (candidate) => {
  pc.addIceCandidate(new RTCIceCandidate(candidate));
});

// when remote sends an answer to us, set it as remote description
socket.on("answer", (answer) => {
  pc.setRemoteDescription(new RTCSessionDescription(answer));
});

// when starting, we need to wait for a remote stream to arrive
pc.onaddstream = (event) => {
  remoteView.srcObject = event.stream;
};

// call start() to initiate
function start() {
  pc.createOffer()
    .then((offer) => {
      return pc.setLocalDescription(offer);
    })
    .then(() => {
      // send the offer to the other peer
      socket.emit("offer", pc.localDescription);
    });
}

// call hangup() to terminate
function hangup() {
  pc.close();
  pc = null;
}

//create chat , video , audio call ui like whats app in react native

//create chat , video , audio call ui like whats app in react native
