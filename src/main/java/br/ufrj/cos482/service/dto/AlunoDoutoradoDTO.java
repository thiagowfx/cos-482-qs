package br.ufrj.cos482.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the AlunoDoutorado entity.
 */
public class AlunoDoutoradoDTO implements Serializable {

    private Long id;


    private Long ataDissertacaoId;
    
    private Long certidaoConclusaoId;
    
    private Long diplomaMestradoId;
    
    private Long alunoId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAtaDissertacaoId() {
        return ataDissertacaoId;
    }

    public void setAtaDissertacaoId(Long documentoSistemaId) {
        this.ataDissertacaoId = documentoSistemaId;
    }

    public Long getCertidaoConclusaoId() {
        return certidaoConclusaoId;
    }

    public void setCertidaoConclusaoId(Long documentoSistemaId) {
        this.certidaoConclusaoId = documentoSistemaId;
    }

    public Long getDiplomaMestradoId() {
        return diplomaMestradoId;
    }

    public void setDiplomaMestradoId(Long documentoSistemaId) {
        this.diplomaMestradoId = documentoSistemaId;
    }

    public Long getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Long alunoId) {
        this.alunoId = alunoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AlunoDoutoradoDTO alunoDoutoradoDTO = (AlunoDoutoradoDTO) o;

        if ( ! Objects.equals(id, alunoDoutoradoDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "AlunoDoutoradoDTO{" +
            "id=" + id +
            '}';
    }
}
