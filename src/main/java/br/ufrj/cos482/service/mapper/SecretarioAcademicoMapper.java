package br.ufrj.cos482.service.mapper;

import br.ufrj.cos482.domain.*;
import br.ufrj.cos482.service.dto.SecretarioAcademicoDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity SecretarioAcademico and its DTO SecretarioAcademicoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SecretarioAcademicoMapper {

    @Mapping(source = "usuario.id", target = "usuarioId")
    SecretarioAcademicoDTO secretarioAcademicoToSecretarioAcademicoDTO(SecretarioAcademico secretarioAcademico);

    List<SecretarioAcademicoDTO> secretarioAcademicosToSecretarioAcademicoDTOs(List<SecretarioAcademico> secretarioAcademicos);

    @Mapping(source = "usuarioId", target = "usuario")
    SecretarioAcademico secretarioAcademicoDTOToSecretarioAcademico(SecretarioAcademicoDTO secretarioAcademicoDTO);

    List<SecretarioAcademico> secretarioAcademicoDTOsToSecretarioAcademicos(List<SecretarioAcademicoDTO> secretarioAcademicoDTOs);

    default Usuario usuarioFromId(Long id) {
        if (id == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
}
