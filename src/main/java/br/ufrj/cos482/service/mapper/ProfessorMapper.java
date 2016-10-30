package br.ufrj.cos482.service.mapper;

import br.ufrj.cos482.domain.*;
import br.ufrj.cos482.service.dto.ProfessorDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Professor and its DTO ProfessorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProfessorMapper {

    ProfessorDTO professorToProfessorDTO(Professor professor);

    List<ProfessorDTO> professorsToProfessorDTOs(List<Professor> professors);

    Professor professorDTOToProfessor(ProfessorDTO professorDTO);

    List<Professor> professorDTOsToProfessors(List<ProfessorDTO> professorDTOs);
}
