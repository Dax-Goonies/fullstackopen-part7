import styled from 'styled-components'

export const StyledView = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 15px;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

export const Row = styled.div`
  margin-bottom: 10px;
`

export const ButtomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const StyledLike = styled.button`
  background: white;
  color: dodgerblue;
  padding: 8px 16px;
  border: 1px solid dodgerblue;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    background: dodgerblue;
    color: white;
  }
`

export const StyledRemove = styled.button`
  background: white;
  color: crimson;
  padding: 8px 16px;
  border: 1px solid crimson;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    background: crimson;
    color: white;
  }
`

export const StyledAddComment = styled.button`
  background: dodgerblue;
  color: white;
  padding: 8px 16px;
  border: 1px solid dodgerblue;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    background: white;
    color: dodgerblue;
  }
`
export const StyledCommentInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-bottom: 1.5px solid lightgrey;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 180px;
`
