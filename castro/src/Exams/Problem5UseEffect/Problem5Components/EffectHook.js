useEffect(() => {
    const validationTimeout = setTimeout(() => {
      // Validation logic
    }, 2000);
  
    return () => clearTimeout(validationTimeout);
  }, [username, password]);