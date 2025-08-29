// 'use client';

// import { useState } from 'react';
// import { useChat } from '@/hooks/useChat';

// export default function Chat() {
//   const [input, setInput] = useState('');
//   const { messages, isLoading, error, sendMessage, clearError, clearMessages } = useChat();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (input.trim() && !isLoading) {
//       sendMessage(input);
//       setInput('');
//     }
//   };

//   const testAPI = async () => {
//     try {
//       const response = await fetch('/api/test');
//       const data = await response.json();
//       console.log('Test API response:', data);
//       alert(`API Status: ${response.status}\n${JSON.stringify(data, null, 2)}`);
//     } catch (error) {
//       console.error('Test API failed:', error);
//       alert('Error testing API. Check console.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       {/* Header */}
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Chat con LLaMA3</h1>
//         <p className="text-sm text-gray-600">Usando Pages Router</p>
//         <button
//           onClick={testAPI}
//           className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded"
//         >
//           Probar API
//         </button>
//       </div>

//       {/* Error display */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <strong>Error:</strong> {error}
//           <div className="mt-2">
//             <button 
//               onClick={clearError}
//               className="bg-red-500 text-white px-2 py-1 rounded text-sm mr-2"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Chat messages */}
//       <div className="border rounded-lg p-4 mb-4 h-96 overflow-y-auto bg-gray-50">
//         {messages.length === 0 ? (
//           <div className="text-center text-gray-500 mt-20">
//             Escribe un mensaje para comenzar...
//           </div>
//         ) : (
//           messages.map((msg, index) => (
//             <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
//               <div className={`inline-block max-w-xs lg:max-w-md p-3 rounded-lg ${
//                 msg.role === 'user' 
//                   ? 'bg-blue-500 text-white' 
//                   : 'bg-gray-200 text-gray-800'
//               }`}>
//                 {msg.content}
//               </div>
//               <div className="text-xs text-gray-500 mt-1">
//                 {msg.role === 'user' ? 'Tú' : 'Asistente'}
//               </div>
//             </div>
//           ))
//         )}
        
//         {isLoading && (
//           <div className="text-left mb-4">
//             <div className="inline-block bg-gray-200 text-gray-800 p-3 rounded-lg">
//               <div className="flex items-center">
//                 <span>Pensando</span>
//                 <div className="ml-2 flex space-x-1">
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Input form */}
//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Escribe tu mensaje..."
//           className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={isLoading}
//         />
//         <button
//           type="submit"
//           disabled={isLoading || !input.trim()}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           {isLoading ? '...' : 'Enviar'}
//         </button>
//       </form>

//       {/* Clear button */}
//       {messages.length > 0 && (
//         <div className="mt-4 text-center">
//           <button
//             onClick={clearMessages}
//             className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
//           >
//             Limpiar chat
//           </button>
//         </div>
//       )}

//       {/* Status */}
//       <div className="mt-4 text-center text-sm text-gray-500">
//         {isLoading ? 'Conectando con LLaMA3...' : 'Ready'}
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Container
} from '@mui/material';
import {
  Send as SendIcon,
  Delete as DeleteIcon,
  SmartToy as AssistantIcon,
  Person as UserIcon,
  Refresh as RefreshIcon,
  SmartToy
} from '@mui/icons-material';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, isLoading, error, sendMessage, clearError, clearMessages } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  const testAPI = async () => {
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      console.log('Test API response:', data);
      alert(`API Status: ${response.status}\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error('Test API failed:', error);
      alert('Error testing API. Check console.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main', mb: 4 }}>
        <Toolbar>
          <SmartToy sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat con LLaMA3
          </Typography>
          <Chip 
            label={isLoading ? "Conectando..." : "Conectado"} 
            color={isLoading ? "default" : "success"}
            size="small"
            variant="outlined"
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" color="primary" fontWeight="500">
              Asistente Inteligente
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={testAPI}
            >
              Probar API
            </Button>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
              action={
                <IconButton size="small" onClick={clearError}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          )}

          <Paper 
            variant="outlined" 
            sx={{ 
              height: '60vh', 
              overflow: 'auto', 
              p: 2, 
              bgcolor: 'background.default',
              mb: 2
            }}
          >
            {messages.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                color: 'text.secondary'
              }}>
                <SmartToy sx={{ fontSize: 60, mb: 2, opacity: 0.5 }} />
                <Typography variant="body1">
                  Escribe un mensaje para comenzar la conversación...
                </Typography>
              </Box>
            ) : (
              <List>
                {messages.map((msg, index) => (
                  <ListItem key={index} sx={{ 
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    gap: 1
                  }}>
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar sx={{ 
                        bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main',
                        width: 32,
                        height: 32
                      }}>
                        {msg.role === 'user' ? <UserIcon /> : <AssistantIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <Paper 
                      elevation={1}
                      sx={{ 
                        p: 2,
                        maxWidth: '70%',
                        bgcolor: msg.role === 'user' ? 'primary.light' : 'background.paper',
                        color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary'
                      }}
                    >
                      <Typography variant="body1">{msg.content}</Typography>
                    </Paper>
                  </ListItem>
                ))}
                
                {isLoading && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                        <AssistantIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Paper elevation={1} sx={{ p: 2, bgcolor: 'background.paper' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={16} />
                        <Typography variant="body1">Pensando...</Typography>
                      </Box>
                    </Paper>
                  </ListItem>
                )}
              </List>
            )}
          </Paper>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !input.trim()}
              endIcon={<SendIcon />}
              sx={{ minWidth: 100 }}
            >
              Enviar
            </Button>
          </Box>

          {messages.length > 0 && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={clearMessages}
                size="small"
              >
                Limpiar conversación
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}