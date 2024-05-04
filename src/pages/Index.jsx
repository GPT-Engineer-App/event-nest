import React, { useState } from "react";
import { Container, VStack, Button, Input, Textarea, Text, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", description: "" });
  const [editIndex, setEditIndex] = useState(-1);
  const toast = useToast();

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.description) {
      toast({
        title: "Error",
        description: "Name and description are required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setNewEvent({ name: "", description: "" });
    toast({
      title: "Event Added",
      description: "Your event has been added successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully!",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEdit = (index) => {
    setNewEvent(events[index]);
    setEditIndex(index);
  };

  const handleUpdateEvent = () => {
    const updatedEvents = events.map((event, index) => {
      if (index === editIndex) {
        return newEvent;
      }
      return event;
    });
    setEvents(updatedEvents);
    setEditIndex(-1);
    setNewEvent({ name: "", description: "" });
    toast({
      title: "Event Updated",
      description: "Your event has been updated successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="full">
        <Text fontSize="2xl" fontWeight="bold">
          Event Manager
        </Text>
        <Box w="full">
          <Input placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          <Textarea placeholder="Event Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} mt={2} />
          {editIndex === -1 ? (
            <Button leftIcon={<FaPlus />} colorScheme="teal" mt={2} onClick={handleAddEvent}>
              Add Event
            </Button>
          ) : (
            <Button leftIcon={<FaEdit />} colorScheme="blue" mt={2} onClick={handleUpdateEvent}>
              Update Event
            </Button>
          )}
        </Box>
        {events.map((event, index) => (
          <Box key={index} p={4} shadow="md" borderWidth="1px" w="full" d="flex" justifyContent="space-between" alignItems="center">
            <VStack align="start">
              <Text fontWeight="bold">{event.name}</Text>
              <Text>{event.description}</Text>
            </VStack>
            <Box>
              <IconButton icon={<FaEdit />} aria-label="Edit" onClick={() => handleEdit(index)} />
              <IconButton icon={<FaTrash />} aria-label="Delete" ml={2} onClick={() => handleDelete(index)} />
            </Box>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
